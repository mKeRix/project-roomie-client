var hbs = require('hbs');

/**
 * Registers all available helpers.
 */

function registerHandlebarsHelpers() {
    registerGroupedEachHelper();
    registerSectionHelper();
}

/**
 * A helper that groups the each command in x items.
 */

function registerGroupedEachHelper() {
    hbs.registerHelper('grouped_each', function(every, context, options) {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    });
}

/**
 * A helper that allows us to define multiple sections in the main template.
 */

function registerSectionHelper() {
    hbs.registerHelper('section', function(name, options){
        if(!this._sections) this._sections = {}; 
        if(!this._sections[name]) this._sections[name] = []; 
        this._sections[name].push(options.fn(this));
        
        return null;
    })
}

module.exports = registerHandlebarsHelpers;
