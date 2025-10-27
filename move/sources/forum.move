module suisphere::forum {
    use std::string::String;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct Forum has key {
        id: UID,
        name: String,
        posts: vector<ID>,
    }

    struct Post has key {
        id: UID,
        author: address,
        title: String,
        content: String,
        timestamp: u64,
        upvotes: u64,
        comments: vector<ID>,
    }

    struct Comment has key {
        id: UID,
        author: address,
        content: String,
        timestamp: u64,
        upvotes: u64,
    }

    public entry fun create_forum(name: String, ctx: &mut TxContext) {
        let forum = Forum {
            id: object::new(ctx),
            name,
            posts: vector[],
        };
        transfer::transfer(forum, tx_context::sender(ctx));
    }

    public entry fun create_post(
        forum: &mut Forum,
        title: String,
        content: String,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        let post = Post {
            id: object::new(ctx),
            author: tx_context::sender(ctx),
            title,
            content,
            timestamp,
            upvotes: 0,
            comments: vector[],
        };
        
        // Add post to forum
        vector::push_back(&mut forum.posts, object::id(&post));
        
        // Transfer post to sender
        transfer::transfer(post, tx_context::sender(ctx));
    }

    public entry fun comment_on_post(
        post: &mut Post,
        content: String,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        let comment = Comment {
            id: object::new(ctx),
            author: tx_context::sender(ctx),
            content,
            timestamp,
            upvotes: 0,
        };
        
        // Add comment to post
        vector::push_back(&mut post.comments, object::id(&comment));
        
        // Transfer comment to sender
        transfer::transfer(comment, tx_context::sender(ctx));
    }

    public entry fun upvote_post(post: &mut Post) {
        post.upvotes = post.upvotes + 1;
    }

    #[view]
    public fun get_post_upvotes(post: &Post): u64 {
        post.upvotes
    }

    #[view]
    public fun get_post_comments_count(post: &Post): u64 {
        vector::length(&post.comments)
    }
}