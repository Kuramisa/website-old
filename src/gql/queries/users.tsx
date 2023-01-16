import gql from "graphql-tag";

export const FetchUsers = gql`
    query ($fetchDb: Boolean, $page: Int, $perPage: Int) {
        users(fetchDb: $fetchDb, page: $page, perPage: $perPage)
    }
`;

export const FetchUser = gql`
    query ($userId: String!, $fetchDb: Boolean) {
        user(userId: $userId, fetchDb: $fetchDb)
    }
`;

export const FetchUserGuilds = gql`
    query ($auth: String!, $fetchDb: Boolean, $page: Int, $perPage: Int) {
        userGuilds(auth: $auth, fetchDb: $fetchDb, page: $page, perPage: $perPage)
    }
`;

export const FetchUserCard = gql`
    query ($userId: String!) {
        userCard(userId: $userId)
    }
`;

export const FetchWarns = gql`
    query ($guildId: String!, $userId: String!, $page: Int, $perPage: Int) {
        warns(guildId: $guildId, userId: $userId, page: $page, perPage: $perPage)
    }
`;

export const FetchReports = gql`
    query ($guildId: String!, $userId: String!, $page: Int, $perPage: Int) {
        reports(guildId: $guildId, userId: $userId, page: $page, perPage: $perPage)
    }
`;
