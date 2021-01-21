module.exports = (req, res, next) => {
    const regexPwd = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/);
    try {  
        const signUp = { ...req.body};        
        let testPwd = regexPwd.test(signUp.password);
        if (testPwd===true) {
            next();
        } else {            
              res.status(401).send({ message:'Invalid Password'});            
            }          
        } catch {
          res.status(500).send({ message:'An error occured'});
        }
      };