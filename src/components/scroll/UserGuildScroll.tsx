import React from "react";
import { useQuery } from "@apollo/client";
import { FetchUserGuilds } from "../../gql/queries/users";
import InfiniteScroll from "react-infinite-scroller";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

const UserGuildScroll = ({ parent }: { parent: React.MutableRefObject<any> }) => {
    const navigate = useNavigate();

    const {
        loading: initialLoading,
        fetchMore,
        data: { userGuilds: guilds } = {}
    } = useQuery(FetchUserGuilds,
        {
            variables: {
                auth: localStorage.getItem("kuramisaToken")
            }
        });

    const loadMore = () => {
        fetchMore({
            variables: {
                offset: guilds.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.length < 1) return prev;
                return Object.assign({}, prev, {
                    guilds: [...prev.userGuilds, ...fetchMoreResult.userGuilds]
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
                <div className="guild-info" onClick={() => navigate(`/guild/${guild.id}`)}>
                    <h6 className="guild-name">{guild.name}</h6>
                    <p className="guild-members">{guild.memberCount ? guild.memberCount : "?"} Members</p>
                </div>
            </div>
        ))}
    </InfiniteScroll>;
};

export default UserGuildScroll;