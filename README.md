# Guardian Companion (A Destiny 2 App)

General Assembly Project 2: Full Stack Application

# Persona and User Stories

## User #1: The Collector

### Persona

The Collector is a casual but active Destiny 2 player who enjoys collecting and managing various in-game items. They play the game for Destiny’s ever evolving story content, while also gaining various unique and powerful loot. They often find it challenging to keep track of all the items in their inventory and vault. They want to know if the loot drop they receive are good rolls or throwaways. The Collector wants an easy way to view, manage, and edit their inventory and organize their vault efficiently.

### Games Played

- Destiny 2

- Baldur’s Gate 3

- Call of Duty

### Core Motivations

- Completion

- Power

- Progression

- Community



### User Story

#### Journey

- Launches game and loads into overworld

- Checks available missions to see what rewards are available.

- As The Collector moves between missions, they must return to Tower to change to the appropriate gear.

- Upon mission completion, they select the reward that they think will round out their Vault.

- When they’ve finished farming their daily missions or feel like they have made enough progress in expanding their Vault, they will stop for the day.



#### Friction Points & Resolutions

- Changing Gear - The Collector often forgets which items in the loadout are best for each mission type and takes upwards of 10 minutes searching through an expansive inventory to find the correct pieces.

- The app will allow The Collector to generate as many Loadouts as they’d like and assign it to specific mission types.

- The app will update in real time based on the state of the Vault to provide a definite location as to where to locate the piece of gear.

- Mission Reward vs Vault Comparisons - The Collector currently has no way to understand if a mission reward is better than something in their Vault as the only way to compare is by memory.

- The app will allow the Collector to make comparisons against all loot of that type within their Vault.



### The App

#### Tasks

- Account access

    - The Collector can log in using their Bungie.net account and access the player Inventory and Vault.

    - The App will scrape data in real time to provide an accurate reflection of the current state of the player Inventory and Vault.

- Loadout management

    - The Collector can create any number loadouts using existing gear from the Vault or Inventory.

    - The Collector can view stats and attributes of different loadouts in a succinct summary page.

    - The Collector can select a loadout which will then highlight pieces of gear in the Vault or Inventory.

- Loot Comparison

    - The Collector can open a page that allows them to make comparisons between the current Mission reward and existing items in the Inventory or Vault.

    - The Collector can filter by:

        - Selected in a loadout

        - Location - Inventory or Vault

        - Rarity

        - Element

        - Type

- Inventory management

    - The Collector can move items freely between character(s) and vault

    - The Collector can access Postmaster and pull drops to vault or character(s)





## User #2: The Theorycrafter



### Persona

The Theorycrafter is a veteran Destiny player that enjoys buildcrafting and chasing godrolls. They often struggle to know what perks each weapon can drop with and what crafted traits each deepsight weapon has without acquiring the patterns. They want to combine high-stat armor pieces to create the best builds with specific stat priorities and exotic armor.



### Games Played

- Destiny 2

- Final Fantasy 14 Online

- World of Warcraft



### Core Motivations

- Optimization

- Mastery

- Efficiency

- Customization



### User Story

#### Journey

- Logs into the game and accesses their Bungie.net account to sync their inventory.

- Checks available missions and deepsight weapon patterns to track progress and obtain new patterns.

- Reviews loot drops to determine if the perks are ideal for their builds.

- Uses an app to generate armor loadouts based on owned items and specific stat priorities, including exotic armor.

- Saves and applies optimized builds for various activities in-game.



#### Friction Points & Resolutions

- Weapon Perks Overview: The Theorycrafter often finds it challenging to know what perks each weapon can drop with or be crafted with.

- Resolution: The app will provide a detailed tooltip for each weapon perk and synergy with builds.

- Deepsight Progress: Keeping track of deepsight progress and where to obtain more patterns is cumbersome.

- Resolution: The app will show deepsight progress and locations for obtaining more patterns.

- Armor Optimization: Combining armor pieces with high stats to create the best builds with specific stat priorities is time-consuming.

- Resolution: The app will auto-generate armor loadouts based on existing stats, prioritized stats, and an exotic armor filter.

### The App

#### Tasks

- Account Access:

    - The Theorycrafter can log in using their Bungie.net account and access their inventory.

    - The app will sync data in real-time to provide an accurate reflection of the current state of the inventory.

- Weapon Perks Overview:

    - The Theorycrafter can view detailed descriptions of each weapon perk and how they synergize with builds.

    - The app will show all possible perks that can drop or be crafted for each weapon.

- Deepsight Progress:

    - The Theorycrafter can access their deepsight progress and find locations to obtain additional patterns.

- Armor Optimization:

    - The Theorycrafter can view armor stats for owned pieces in the vault and inventory.

    - The app will generate builds based on desired stat tiers, including an exotic armor filter.

    - The Theorycrafter can save builds as loadouts and apply them in-game.


# Wireframe

![Wireframe 1](/readme-resources/Wireframe.png)

# ERD

1. User
    - Attributes:
        - UserID (Primary Key)
        - Username
        - Email
        - BungieNetID
    - Relationships:
        - One-to-Many with Inventory
        - One-to-Many with Loadouts
        - One-to-Many with DeepsightProgress
2. InventoryItem
    - Attributes:
        - ItemID (Primary Key)
        - UserID (Foreign Key)
        - Name
        - Type
        - PowerLevel
        - Perks
        - Location (Inventory or Vault)
    - Relationships:
        - Many-to-One with User
3. Loadout
    - Attributes:
        - LoadoutID (Primary Key)
        - UserID (Foreign Key)
        - Name
        - PrioritizedStats
    - Relationships:
        - One-to-Many with LoadoutItem
        - Many-to-One with User
4. LoadoutItem
    - Attributes:
        - LoadoutItemID (Primary Key)
        - LoadoutID (Foreign Key)
        - ItemID (Foreign Key)
    - Relationships:
        - Many-to-One with Loadout
        - Many-to-One with InventoryItem
5. DeepsightProgress
    - Attributes:
        - ProgressID (Primary Key)
        - UserID (Foreign Key)
        - WeaponName
        - ProgressPercentage
        - PatternLocation
    - Relationships:
        - Many-to-One with User
