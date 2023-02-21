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
    if (User.count()) {
        return;
    }

    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);
};

module.exports = seedUsers;
