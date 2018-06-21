const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Story schema
const StorySchema = mongoose.Schema({
	storyName: {
		type: String
	},
	author: {
		type: String,
		required: true
	},
	numberOfChapters: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	kindStory: {
        type: String,
        required: true
	},
	introduction: {
		type: String,
		required: true
	},
	chapter: [
	    {
	    	number: String,
	    	name: String,
	    	content: String
	    }
	],
	like: {
		type: String,
		required: false
	},
	comment: [
	    {
	    	user: String,
	    	message: String,
	    	dateCreated: String,
	    	like: String
	    }
	],
	view: {
		type: String,
		required: false
	}
});

const Story =  module.exports = mongoose.model('Story', StorySchema);

module.exports.getStoryById = function(id, callback){
	
	Story.findOne({_id: id._id}, callback);
}
module.exports.getChapterByNumber = function(chapter, callback){
	Story.findOne({ _id: chapter.id }).select({ chapter: { $elemMatch: {number: chapter.number }}}).exec(callback);
}

module.exports.getStoryByStoryName = function(storyName, callback){
    const query = {storyName: storyName}
	Story.findOne(query, callback);
}


module.exports.getListStory = function(callback) {
	Story.find({}, {storyName: 1,numberOfChapters: 1,_id: 1}, callback);

}
module.exports.getListChapter = function(story, callback){
	Story.find({storyName:story.storyName}, {chapter:1, _id: 0}, callback);
}
//add Story and chapter
module.exports.addStory = function(newStory, callback){

		newStory.save(callback);       
	
}
module.exports.addChapter = function(chapter, callback){
	Story.findOneAndUpdate({storyName: chapter.storyName}, 
						{$push: {chapter: 
							{number: chapter.number,
							name: chapter.name,
							content: chapter.content}
					}}, callback);
}

//remove story and chapter
module.exports.removeStory = function(storyName, callback){
	const query = {storyName: storyName}
    Story.deleteOne(query, callback);
}
module.exports.removeChapter = function(chapter, callback){
	console.log(chapter)
	Story.findOneAndUpdate({storyName: chapter.storyName},
		                    {$pull: {chapter:
		                        { number: chapter.number} 
		                    }},{multi:false}, callback);
}
//update story and chapter
module.exports.updateStory = function(story, callback){
	Story.findOneAndUpdate({storyName: story.storyName}, 
						{$push: {author: story.author,
							     numberOfChapters: story.number,
							     kindStory: story.kindStory,
							     introduction: story.introduction
					}}, callback);
}
module.exports.updateChapter = function(story,callback){
	
}
	
