import gql from "graphql-tag";

export const IsPlaying = gql`
    query($guildId: String!) {
        isPlaying(guildId: $guildId)
    }
`;

export const FetchMusicPlayer = gql`
    query($guildId: String!) {
        musicPlayer(guildId: $guildId)
    }
`;