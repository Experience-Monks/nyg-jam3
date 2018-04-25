export default (...funcs) => target => funcs.reduce((result, func) => func(result), target);
