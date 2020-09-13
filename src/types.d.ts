import { Doc } from "./utils/http";

type NewsItem = {
	_id: string;
	lead_paragraph: string;
	imgUrl: string | null;
	web_url: string;
};

type FavoritesState = {
	favorites: NewsItem[];
	loading: boolean;
};

export interface NewsItemProps {
	doc: Doc;
}
