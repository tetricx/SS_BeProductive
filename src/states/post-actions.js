import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from 'api/posts.js';

/*  Posts */

function startLoading() {
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

function endCreateVote(post) {
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    };
}

export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(searchText).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

export function createPost(mood, text) {
    //TODO
};

export function createVote(id, mood) {
    //TODO
};

/*  Search text */

export function setSearchText(searchText) {
    // TODO
}

/*  Post Form */

export function input(value) {
    //TODO
};

export function inputDanger(danger) {
    //TODO
};

export function toggleMood() {
    //TODO
};

export function setMoodToggle(toggle) {
    //TODO
};

export function selectMood(mood) {
    //TODO
};

/*  Post item */

export function toggleTooltip(id) {
   //TODO
};

export function setTooltipToggle(id, toggle) {
    //TODO
};
