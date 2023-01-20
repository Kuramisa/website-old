import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";

import Avatar from "@mui/material/Avatar";
import InfiniteScroll from "react-infinite-scroller";

import { FetchGuilds } from "../../gql/queries/guilds";

const BotGuildScroll = ({ parent }: { parent: React.MutableRefObject<any> }) => {

    const navigate = useNavigate();

    const { data: { guilds } = {}, fetchMore, loading: initialLoading } = useQuery(FetchGuilds, {
        variables: {
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
                    guilds: {
                        data: [...prev.guilds.data, ...fetchMoreResult.guilds.data],
                        count: fetchMoreResult.guilds.count,
                        page: fetchMoreResult.guilds.page,
                        perPage: fetchMoreResult.guilds.perPage
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
                        <Avatar sx={{ color: "#fff" }}>{guild.nameAcronym ? guild.nameAcronym : guild.name[0]}</Avatar>
                    )}

                </div>
                <div className="guild-info">
                    <h6 className="guild-name" onClick={() => navigate(`/guild/${guild.id}`)}>{guild.name}</h6>
                    <p className="guild-members">{guild.memberCount} Members</p>
                </div>
            </div>
        ))}
    </InfiniteScroll>;
};

export default BotGuildScroll;