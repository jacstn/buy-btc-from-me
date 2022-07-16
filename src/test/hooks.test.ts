const models = require('../models')

before("create/reset test db", (done:any) => {
    models.sequelize.sync({ force: true }).then(()=>{
        done()
    }).catch((e:any) => {
        done(e)
    })
})