const User = require("../../models/Category.model");

const users = [
    {
        username: "dummy",
        email: "dummy@site.com",
        password: "dummy",
        photo: "images/dummy-user.jpeg",
    },
];

const seedUsers = async () => {
    try {
        if (User.count() > 0) {
            return;
        }

        const createdUsers = await User.create(users);
        console.log(`Created ${createdUsers.length} users`);
    } catch (error) {
        console.error(
            `something went wrong while seeding Users: ${error.message}`
        );
    }
};

module.exports = seedUsers;
