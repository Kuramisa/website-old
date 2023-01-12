import gql from "graphql-tag";

export const FetchGuilds = gql`
    query ($fetchDb: Boolean, $first: Int, $offset: Int) {
        guilds(fetchDb: $fetchDb, first: $first, offset: $offset)
    }
`;

export const FetchGuild = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        guild(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FetchMembers = gql`
    query ($guildId: String!, $fetchDb: Boolean, $first: Int, $offset: Int) {
        members(guildId: $guildId, fetchDb: $fetchDb, first: $first, offset: $offset)
    }
`;

export const FetchMember = gql`
    query ($guildId: String!, $memberId: String!, $fetchDb: Boolean) {
        member(guildId: $guildId, memberId: $memberId, fetchDb: $fetchDb)
    }
`;
