const {UserExcpectation} = require('../models');
const {body, validationResult} = require('express-validator');

// Post /api/expectations
exports.createOrUpdateExpectation = [
    body('preferred_age_min').optional().isInt({min:18}),
    body('preferred_age_max').optional().isInt({min:18}),
    async (req, res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        try{
            const userId = req.user.id;
            const payload = req.body;

            let expectation = await UserExcpectation.findOne({where: {user_id: userId}});
            if(expectation){
                expectation= await expectation.create({user_id: userId, ...payload});
            }
            else{
                await expectation.update(payload);
            }
            return res.json({message: 'Expectation saved successfully', expectation: expectation});
        } catch(err){
            console.error('Error in createOrUpdateExpectation:', err);
            return res.status(500).json({message: 'Failed to save expectation'});
        }
    }
];

//GET /api/expectations
exports.getOurExpectation = async (req, res)=> {
    try{
        const expectation = await UserExcpectation.findOne({where: {user_id: req.user.id}});
        return res.json(expectation);
    }
    catch(err){
        console.error('Error in getOurExpectation:', err);
        return res.status(500).json({message: 'Failed to fetch expectation'});
    }
}