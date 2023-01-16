import gql from "graphql-tag";

export const FetchGuilds = gql`
    query ($fetchDb: Boolean, $page: Int, $perPage: Int) {
        guilds(fetchDb: $fetchDb, page: $page, perPage: $perPage)
    }
`;

export const FetchGuild = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        guild(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FetchMembers = gql`
    query ($guildId: String!, $fetchDb: Boolean, $page: Int, $perPage: Int) {
        members(guildId: $guildId, fetchDb: $fetchDb, page: $page, perPage: $perPage)
    }
`;

export const FetchMember = gql`
    query ($guildId: String!, $memberId: String!, $fetchDb: Boolean) {
        member(guildId: $guildId, memberId: $memberId, fetchDb: $fetchDb)
    }
`;
