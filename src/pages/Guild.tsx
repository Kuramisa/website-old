import "../assets/less/guild.less";

import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { FetchGuild } from "../gql/queries/guilds";

import MemberTable from "../components/guild/MemberTable";
import GuildInfo from "../components/guild/GuildInfo";

const Guild = ({ auth, bot }: { auth: any, bot: any }) => {
    const { guildId } = useParams();
    const { loading, data: { guild } = {} } = useQuery(FetchGuild, {
        variables: {
            guildId,
            fetchDb: true
        }
    });

    if (loading) return <></>;
    if (!guild) return <Navigate to="/" replace={true} />;

    return (
        <div className="guild-container">
            <GuildInfo auth={auth} guild={guild} />
            {auth &&
                guild.members.includes(bot.id) &&
                guild.members.includes(auth.id) && (
                    <MemberTable guild={guild} />
                )}
        </div>
    );
};

export default Guild;