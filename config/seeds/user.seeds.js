const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

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
        if ((await User.count()) > 0) {
            console.log("Aborting: Users are already seeded");
            return;
        }
        const salt = await bcrypt.genSalt(10);

        for (user of users) {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, salt);
            }
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
