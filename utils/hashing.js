const { hash } = require("bcryptjs")

exports.hasherPWD = async (value, saltValue)=>{
    const result = await hash(value, saltValue);
    return result;
}