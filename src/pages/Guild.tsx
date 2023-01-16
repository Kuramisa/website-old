import "../assets/less/guild.less";

import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FetchGuild } from "../gql/queries/guilds";

import MemberTable from "../components/guild/MemberTable";
import GuildInfo from "../components/guild/GuildInfo";

const inviteUrl = "https://discord.com/oauth2/authorize?client_id=969414951292788766&permissions=1634569944311&scope=bot";

const Guild = ({ auth, bot }: { auth: any, bot: any }) => {
    const { guildId } = useParams();
    const { loading, data: { guild } = {} } = useQuery(FetchGuild, {
        variables: {
            guildId,
            fetchDb: true
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
            <div className="member-music">
                {auth &&
                    guild.members.includes(bot.id) &&
                    guild.members.includes(auth.id) && (
                        <>
                            <MemberTable guild={guild} />
                        </>
                    )}
            </div>
        </div>
    );
};

export default Guild;