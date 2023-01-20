import "../assets/less/guild.less";

import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FetchGuild } from "../gql/queries/guilds";
import { IsPlaying } from "../gql/queries/music";

import MemberTable from "../components/guild/MemberTable";
import GuildInfo from "../components/guild/GuildInfo";
import MusicPlayer from "../components/guild/MusicPlayer";

const inviteUrl = "https://discord.com/oauth2/authorize?client_id=969414951292788766&permissions=1634569944311&scope=bot";

const Guild = ({ auth, bot }: { auth: any, bot: any }) => {
    const { guildId } = useParams();
    const { loading, data: { guild } = {} } = useQuery(FetchGuild, {
        variables: {
            guildId,
            fetchDb: true
        }
    });

    const { data: { isPlaying: isMusicPlaying } = {} } = useQuery(IsPlaying, {
        variables: {
            guildId
        }
    });

    if (loading) return <></>;

    if (!guild) {
        window.open(inviteUrl, "_blank");
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="guild-container">
            <GuildInfo auth={auth} guild={guild} />
            {auth &&
                guild.members.includes(bot.id) &&
                guild.members.includes(auth.id) && (
                    <div className="member-music">
                        <MemberTable guild={guild} />
                        {isMusicPlaying && (
                            <MusicPlayer guild={guild} />
                        )}
                    </div>
                )}
        </div>
    );
};

export default Guild;