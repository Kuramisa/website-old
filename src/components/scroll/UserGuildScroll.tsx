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
                auth: localStorage.getItem("kuramisaToken"),
                perPage: 9
            }
        });

    const loadMore = (page: number) => {
        fetchMore({
            variables: {
                page
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    userGuilds: {
                        data: [...prev.userGuilds.data, ...fetchMoreResult.userGuilds.data],
                        count: fetchMoreResult.userGuilds.count,
                        page: fetchMoreResult.userGuilds.page,
                        perPage: fetchMoreResult.userGuilds.perPage
                    }
                });
            }
        });
    };

    if (initialLoading) return <></>;

    return <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={guilds.data.length < guilds.count}
        className="sidebar"
        useWindow={false}
        getScrollParent={() => parent.current}
    >
        {guilds.data.map((guild: any, id: any) => (
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
                    <p className="guild-members">{guild.memberCount ? guild.memberCount : "?"} Members</p>
                </div>
            </div>
        ))}
    </InfiniteScroll>;
};

export default UserGuildScroll;