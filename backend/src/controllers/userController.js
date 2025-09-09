const {UserProfile, UserExcpectation} = require('../models');
const {body, validationResult} = require('express-validator');
const calculateAge = require('../utils/calculateAge');

// get /api/users/OurProfile
exports.getOurProfile = async (req, res)=> {
    try{
        const user = await UserProfile.findByPk(req.user.id, {
            include: [{model: UserExcpectation, as: 'expectation'}]
        });
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.json(user);
    } catch(err){
        console.error('Error in getOurProfile:', err);
        return res.status(500).json({message: 'Failed to fetch'});
    }
};

// put /api/users/OurProfile
exports.updateOurProfile = [
    body('full_name').optional().isString(),
    body('dob').optional().isISO8601().toDate(),
    body('email').optional().isEmail(),
    async (req, res)=> {
        const errors = validationResult(res);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        try{
            const user = await UserProfile.findByPk(req.user.id);
            if(!user) return res.status(404).json({message: 'User not found'});

            const payload = req.body;
            if(payload.dob) payload.age = calculateAge(payload.dob);

            await user.update(payload);
            return res.json({message:'Profile updated successfully',user});
        } catch(err){
            console.error('Error in updateOurProfile:', err);
            return res.status(500).json({message: 'Update failed'});
        }
    }
];

// Get /api/users/:id
exports.getProfileById = async (req, res)=> {
    try{
        const id=req.params.id;
        const user = await UserProfile.findByPk(id, {
            include: [{model: UserExpectation, as: 'expectation'}]
        });
        
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.json(user);
    } catch(err){
        console.error('Error in getProfileById:', err);
        return res.status(500).json({message: 'Failed to fetch'});
    }
};