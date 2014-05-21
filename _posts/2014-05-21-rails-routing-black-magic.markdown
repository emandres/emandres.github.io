---
title: Rails Routing Black Magic
layout: default
---

<h1>{{page.title}}</h1>

I recently ran into a situation with Rails routing that I didn't know how to address. In short, I wanted to create arbitrary routes based on a field on one of my models. My first naive solution was to do something along these lines:

    resources :components do
      get '/components/:component_type' => 'components#filter', as: :filter
    end

However, since the `show` route was automatically created by `resources` first, a path such as `/components/books` gets routed to `show` instead of `filter`, with the route parameters hash `{:controller => 'components', :action => 'show', :id => 'books'}`. Next I tried switching it a bit by putting the `on` option in:

    resources :components do
      get '/components/:component_type' => 'components#filter', on: :collection, as: :filter
    end

This caused the opposite problem; routing `/components/1` led to the filter action, which resulted in the route parameters `{:controller => 'components', :action => 'filter', :component_type => '1'}`. 

Where I went next is a path no mortal should tread. Okay, maybe I'm being a bit dramatic, but having tried it out and found a better way, it's probably not the best solution. I thought, "Hey, I have my component types already in a table. Why don't I just load those up in the routes file and create my routes dynamically?" It resulted in this code:

    ComponentType.where('route_name IS NOT NULL').pluck('route_name').each do |route_name|
      get "/components/#{route_name}" => 'components#filter'
    end

Now, there's nothing inherently wrong with this code. I could see using it in certain cases. One problem, however, is that you lose route helpers (i.e. I can't write `filter_components_path(component_type: 'books')` in my code). My solution to that problem was the unholy union of ActiveRecord, regular expressions, and Rails routes:

    get '/components/:component_type',
      component_type: Regexp.new(ComponentType.where('route_name IS NOT NULL').pluck('route_name').join('|')),
      as: :filter_components

I have to say, I was feeling *pretty* clever about that one. That, fortunately, is also my trigger for realizing I've done something completely stupid. Besides being ridiculously terrible to read, it has a major defect: any Component Types created after the server starts won't be routed, since routes are created at startup. Wearing my hubris like a gaudy full length fur coat, I slapped this little miracle into my model:

    class ComponentType
      def create_or_update
        super && Rails.application.reload_routes!
      end
    end

Great! Everything works. Time for an early lunch. Except... well, now my test are running a full second longer (3.5 seconds versus 2.5 before &mdash; it's a new project). Well, maybe I should rethink this. One of the first paths I went down when trying to figure this out was to filter routes based on what the route parameters look like. I already figured that out with the my little regex trick up there. I decided to loosen the constraint on only routing to existing Component Types, and instead just looks for the patterns that look like words and send those to the `filter` action. Here's what I settled on:

    resources :components do
      get ':component_type' => 'components#filter',
        component_type: /(?!new)(?!edit)[a-z]\w*/i,
        on: :collection,
        as: :filter
    end

Picking apart the regex, the `(?!...)` groups are negative lookaheads. I don't want to route `/new` or `/edit` to filter, so I use the negative lookahead to exlcude those. I ensure that the word starts with a letter, since `\w` will match letters, numbers, and underscores. Leaving `[a-z]` out would make it possible for numeric IDs to pass the regex. 

So there you have it: the better part of a day spent learning that you can limit route parameters based on a regular expression. And that you should never, ever dynamically generate a regular expression. Or put ActiveRecord code in your `routes.rb`. Or reload your routes when a record is saved.
