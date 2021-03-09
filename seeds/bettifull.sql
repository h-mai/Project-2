drop table if exists bets, users;

create table if not exists users
(
    id        int auto_increment
        primary key,
    username  varchar(255) not null,
    email     varchar(255) not null,
    password  varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    constraint email
        unique (email)
);

create table if not exists bets
(
    id        int auto_increment
        primary key,
    betTitle  varchar(255)      null,
    user1     int               not null,
    user2     int               not null,
    wager     int               not null,
    votes1    int     default 0 null,
    votes2    int     default 0 null,
    expires   datetime          not null,
    status    tinyint default 0 not null,
    outcome   tinyint default 0 not null,
    createdAt datetime          not null,
    updatedAt datetime          not null,
    constraint bets_ibfk_1
        foreign key (user1) references users (id)
            on update cascade,
    constraint bets_ibfk_2
        foreign key (user2) references users (id)
            on update cascade
);

create index user1
    on bets (user1);

create index user2
    on bets (user2);



insert into betti.users (username, email, password, createdAt, updatedAt)
values  ('Jonathon Reilly', '1@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Jody Forster', '2@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Bobby Deniro', '3@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Michelle Fifer', '4@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Bradley Pit', '5@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Shazza Rock', '6@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Alistair Pacino', '7@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Meahghan Rhyahn', '8@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Thomas Hanks', '9@example.com', '123', '2021-03-02 10:00:01', '2021-03-02 10:00:00'),
        ('Uma Thurman', '10@example.com', '123', '2021-03-02 10:00:00', '2021-03-02 10:00:00');

insert into betti.bets (id, betTitle, user1, user2, wager, votes1, votes2, expires, status, outcome, createdAt, updatedAt)
values  (1, 'Can watch entire netflix catalgoe', 1, 2, 25, 63, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:17'),
        (2, 'Collingwood to win GF', 2, 3, 30, 40069, 37, '2021-03-29 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:35:22'),
        (3, 'can''t drink 8 litres of chocolate milk', 3, 4, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (4, 'Wont skydive by the end of the year', 5, 6, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (5, 'cant walk in their hands for more than 10 metres', 6, 7, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (6, 'will not go out this Friday', 8, 9, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (7, 'will not go a week without Playstation', 9, 10, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (8, 'Won''t last dry july', 10, 9, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (9, 'Wallabies to beat All Blacks', 9, 8, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (10, 'Cleveland Browns are not named after a colour', 8, 7, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (11, 'Covid is real', 7, 6, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (12, 'Car wont last another 40k', 6, 5, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (13, 'Oasis three hits all use the same chords', 5, 4, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (14, 'There will never be another Expendables', 4, 3, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (15, 'There will be another Rambo', 3, 2, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18'),
        (16, 'The Neveryending story ends.', 2, 1, 25, 60, 12, '2021-03-28 15:04:05', 0, 0, '2021-03-02 00:00:00', '2021-03-04 12:33:18');

