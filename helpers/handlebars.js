var hbs = require('hbs');

/**
 * Registers all available helpers.
 */

function registerHandlebarsHelpers() {
    registerGroupedEachHelper();
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

module.exports = registerHandlebarsHelpers;
