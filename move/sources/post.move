module suisphere::post {
    use std::string::String;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;
    use sui::balance::Balance;
    use sui::coin::Coin;
    use sui::sui::SUI;

    struct Post has key {
        id: UID,
        author: address,
        title: String,
        content: String,
        timestamp: u64,
        upvotes: u64,
        comments: vector<ID>,
        reward_pool: Balance<SUI>,
    }

    struct Comment has key {
        id: UID,
        author: address,
        content: String,
        timestamp: u64,
        upvotes: u64,
    }

    public entry fun create_post(
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
            reward_pool: balance::zero(),
        };
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
        
        vector::push_back(&mut post.comments, object::id(&comment));
        transfer::transfer(comment, tx_context::sender(ctx));
    }

    public entry fun upvote_post(post: &mut Post) {
        post.upvotes = post.upvotes + 1;
    }

    // Reward function - transfer SUI from reward pool to post author
    public entry fun reward_post(
        post: &mut Post,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let reward_coin = coin::mint_and_transfer(
            &mut post.reward_pool,
            amount,
            post.author,
            ctx
        );
    }

    #[view]
    public fun get_post_upvotes(post: &Post): u64 {
        post.upvotes
    }

    #[view]
    public fun get_post_comments_count(post: &Post): u64 {
        vector::length(&post.comments)
    }

    #[view]
    public fun get_post_reward_pool(post: &Post): &Balance<SUI> {
        &post.reward_pool
    }
}