const { Post } = require('../models')

const postData = [
    {
        title:'HERE I COME!',
        post_content:'sorry guys im running ',
        user_id:3

    },
    {
        title:'anyone still coming to Penn Valley Park ',
        post_content:'hey guys i arrived i was wondering if anyone is still coming',
        user_id: 1

    },
    {
        title:'nice meeting',
        post_content:'good work today guys have finished the project together cant wait to deploy',
        user_id:5

    },
    {
        title:'meetings off',
        post_content:'sorry guys something important just came up i had to cancel i will reschedule soon.',
        user_id:2

    },
    {
        title:'The bug',
        post_content:'is that bug still lingering? ill handle it if so',
        user_id:4

    },
]
const postSeeds = () => Post.bulkCreate(postData)