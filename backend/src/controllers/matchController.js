const {UserProfile, UserExpectation} = require("../models/");
const {scoreCandidate} = require("../services/matchService");
const {Op, where} = require("sequelize");

exports.getMatches = async (req, res) => {
    try{
        const userId = req.user.id;
        const myExpectation = await UserExpectation.findOne({where: {user_id: userId}});
        if(!myExpectation){
            return res.status(400).json({message: 'Set your expectations first'});
        }
        const otherProfiles = await UserProfile.findAll({
            where: {id: {[Op.ne]: userId}},
            include: [{model: UserExpectation, as: 'expectation'}]
        });
        const scored = otherProfiles.map(p=>{
            const score = p.expectation ? scoreCandidate(p, myExpectation):0;
            return {profile: p, score};
        });
        scored.sort((a,b)=> b.score - a.score);
        return res.json(scored);
    } catch(err){
        console.error('Error in getMatches:', err);
        return res.status(500).json({message: 'Failed to fetch matches'});
    }
};