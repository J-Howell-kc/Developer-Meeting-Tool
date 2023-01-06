const { Comment } = require('../models')
const { bulkCreate } = require('../models/User')

const commentData = [
    {
        comment_text:'ill be there asap!',
        user_id:2,
        post_id:1
    },
    {
        comment_text:'im here',
        user_id:2,
        post_id:3
    },
    {
        comment_text:'this park is really beautiful one of the reasons i come here lol',
        user_id:1,
        post_id:2
    },
    {
        comment_text:'just fixed the bug and tested the build should be all good now',
        user_id:4,
        post_id:5
    }
]
commentSeeds = () => Comment.bulkCreate(commentData)