
  module.exports = (req, res, next) => {

    const regexName = RegExp(/^[0-9A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,30}$/);
    const regexManufacturer = RegExp(/^[0-9A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,30}$/);
    const regexdescription = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F !?:(),\n\.'-]{2,600}$/);
    const regexMainPepper = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,30}$/);
    
    try { 
        let sauceCheck
        if (req.file) {
          sauceCheck = { ...JSON.parse(req.body.sauce)};
        } else {
          sauceCheck = { ...req.body}
        }        
        let test1 = regexName.test(sauceCheck.name);
        let test2 = regexManufacturer.test(sauceCheck.manufacturer);
        let test3 = regexdescription.test(sauceCheck.description);
        let test4 = regexMainPepper.test(sauceCheck.mainPepper);

          if (test1===true && test2===true && test3===true && test4===true) {
            next();
          } else {
            if (test1 === false) {
              res.status(401).send({ message:'Name should start with a capital and contain only letters, numbers, apostrophe and hyphen'});
            } else if (test2 === false) {
              res.status(401).send({ message:'Manufacturer name should start with a capital and contain only letters, numbers apostrophe and hyphen'});
            } else if (test3 === false) {
              res.status(401).send({ message:'Description should start with a capital and contain only alphanumeric characters, dot, comma, exclamation or question marks, apostrophe and hyphen'});
            } else if (test4 === false) {
              res.status(401).send({ message:'Main pepper name should start with a capital and contain only letters, apostrophe and hyphen'});
            }            
            }          
        } catch {
          res.status(500).send({ message:'An error occured'});
        }
      };