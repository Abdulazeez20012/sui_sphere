module suisphere::user {
    use std::string::String;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct UserProfile has key {
        id: UID,
        owner: address,
        name: String,
        avatar_url: String,
        badges: vector<Badge>,
    }

    struct Badge has store {
        id: String,
        name: String,
        description: String,
    }

    public entry fun create_user_profile(
        name: String,
        avatar_url: String,
        ctx: &mut TxContext
    ) {
        let profile = UserProfile {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            name,
            avatar_url,
            badges: vector[],
        };
        transfer::transfer(profile, tx_context::sender(ctx));
    }

    public entry fun add_badge(
        profile: &mut UserProfile,
        badge_id: String,
        badge_name: String,
        badge_description: String,
    ) {
        // Only owner can add badges
        assert!(profile.owner == tx_context::sender(), 0);
        
        let badge = Badge {
            id: badge_id,
            name: badge_name,
            description: badge_description,
        };
        
        vector::push_back(&mut profile.badges, badge);
    }

    #[view]
    public fun get_user_badges(profile: &UserProfile): &vector<Badge> {
        &profile.badges
    }

    #[view]
    public fun get_badge_count(profile: &UserProfile): u64 {
        vector::length(&profile.badges)
    }
}