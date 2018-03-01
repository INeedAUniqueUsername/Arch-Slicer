const id = function(inp) {
    // strips out the first <@! and > in a string
    // if you send it a string that is already a legit id, it won't be harmed
    // if not passed a String, sends the input back
    // should always return a String
    if (typeof(inp) !== 'string') {return inp};
    var outp = inp.replace('<', '').replace('>', '').replace('!', '').replace('@', '');
    return outp;
};
const tag = function(inp) {
    var outp = '<@' + inp + '>';
    return outp;
};
module.exports = {
    id: id,
    tag: tag,
}