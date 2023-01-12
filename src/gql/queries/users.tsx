import gql from "graphql-tag";

export const FetchUsers = gql`
    query ($fetchDb: Boolean, $first: Int, $offset: Int) {
        users(fetchDb: $fetchDb, first: $first, offset: $offset)
    }
`;

export const FetchUser = gql`
    query ($userId: String!, $fetchDb: Boolean) {
        user(userId: $userId, fetchDb: $fetchDb)
    }
`;

export const FetchUserGuilds = gql`
    query ($auth: String!, $fetchDb: Boolean) {
        userGuilds(auth: $auth, fetchDb: $fetchDb)
    }
`;

export const FetchUserCard = gql`
    query ($userId: String!) {
        userCard(userId: $userId)
    }
`;

export const FetchWarns = gql`
    query ($guildId: String!, $userId: String!, $first: Int, $offset: Int) {
        warns(guildId: $guildId, userId: $userId, first: $first, offset: $offset)
    }
`;

export const FetchReports = gql`
    query ($guildId: String!, $userId: String!, $first: Int, $offset: Int) {
        reports(guildId: $guildId, userId: $userId, first: $first, offset: $offset)
    }
`;
