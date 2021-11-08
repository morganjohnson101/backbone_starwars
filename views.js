var StarshipModel = Backbone.Model.extend({
    defaults: {
        name: null,
        manufacturer: null,
        crew: null,
        cost_in_credits: null
    }
});

var StarshipCollection = Backbone.Collection.extend({
    model: StarshipModel,
    url: "http://swapi.dev/api/starships",
    parse: function(starships){
        return starships.results;
    },
    falconChecker: function(){
        _.each(this.models, function(ship){
            if(ship.get('name') === 'Milllennium Falcon'){
                ship.set('cost_in_credits','priceless');
            }
        });
    }
});

var StarshipView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<h1><%= name %></h1>"),
    initialize: function() {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var StarshipListView = Backbone.View.extend({
    el: '#starship_list',
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.empty();
        this.collection.each(function (starship) {
            var starshipView = new StarshipView({ model: starship });
            this.$el.append(starshipView.render().$el);
        }, this);
    }
});

var starship = new StarshipCollection();
starship.fetch().then(function(){
    var myStarshipList = new StarshipListView({collection: starship})
});