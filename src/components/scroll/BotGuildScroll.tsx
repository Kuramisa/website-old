import React from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";

import Avatar from "@mui/material/Avatar";
import InfiniteScroll from "react-infinite-scroller";

import { FetchGuilds } from "../../gql/queries/guilds";

const BotGuildScroll = ({ parent }: { parent: React.MutableRefObject<any> }) => {

    const navigate = useNavigate();

    const { data: { guilds } = {}, fetchMore, loading: initialLoading } = useQuery(FetchGuilds);

    const loadMore = () => {
        fetchMore({
            variables: {
                offset: guilds.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.length < 1) return prev;
                return Object.assign({}, prev, {
                    guilds: [...prev.guilds, ...fetchMoreResult.guilds]
                });
            }
        });
    };

    if (initialLoading) return <></>;

    return <InfiniteScroll
        pageStart={0}
        loadMore={() => loadMore()}
        hasMore={true}
        className="sidebar"
        useWindow={false}
        getScrollParent={() => parent.current}
    >
        {guilds.map((guild: any, id: any) => (
            <div className="guild" key={id}>
                <div className="guild-icon">
                    {guild.iconURL ? (
                        <Avatar src={guild.iconURL} />
                    ) : (
                        <Avatar>{guild.name[0]}</Avatar>
                    )}

                </div>
                <div className="guild-info">
                    <h6 className="guild-name" onClick={() => navigate(`/guild/${guild.id}`)}>{guild.name}</h6>
                    <p className="guild-members">{guild.memberCount}</p>
                </div>
            </div>
        ))}
    </InfiniteScroll>;
};

export default BotGuildScroll;