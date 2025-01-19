import { AccentColor } from "styles/colors";

export interface CleanupSettings {
    deleteReadEntries: 'never' | 1 | 3 | 7 | 14 | 21 | 28;
    deleteUnreadEntries: 'never' | 1 | 3 | 7 | 14 | 21 | 28;
}

export interface Settings {
    markOpenedAsRead: boolean;
    markScrolledAsRead: boolean;
    doubleTapToCloseArticles: boolean;
    fontSize: 1 | 2 | 3 | 4 | 5;
    theme: 'light' | 'dark' | 'device';
    accent: AccentColor;
    secondaryAccent: AccentColor;
    fontFamily: 'Roboto';
    cleanupSettings: CleanupSettings;
    filterKeywords: string[];
}

// services/settings.ts
export const defaultSettings: Settings = {
    // ... other properties
    filterKeywords: []
}

// pages/settings.tsx
import { useState } from 'react';

const FilterKeywordsInput = () => {
    const settings = useSettings();
    const updater = useSettingsUpdater('filterKeywords');
    const [keywords, setKeywords] = useState(settings.filterKeywords.join(', '));

    const onKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeywords = e.target.value.split(',').map(k => k.trim());
        setKeywords(e.target.value);
        updater(newKeywords);
    };

    return (
        <ListItem primary="Filter Keywords" secondary="Comma-separated keywords to filter out articles.">
            <input
                className="w-full bg-input text-primary"
                type="text"
                value={keywords}
                onChange={onKeywordsChange}
            />
        </ListItem>
    );
};

// Add the FilterKeywordsInput component to the settings page
const SettingsPage = () => {
    // ... other components
    return (
        <div>
            {/* ... other settings */}
            <FilterKeywordsInput />
            {/* ... other settings */}
        </div>
    );
};

// pages/subscriptions.tsx
function SubscriptionPage() {
    const settings = useSettings();
    const filterKeywords = settings.filterKeywords;

    const filterArticles = (articles: Article[]) => {
        return articles.filter(article => {
            return !filterKeywords.some(keyword => article.title.includes(keyword) || article.content.includes(keyword));
        });
    };

    const subscriptions = useLiveQuery(async () => {
        const db = await getDb();
        const allSubscriptions = await db.subscriptions.toArray();
        return allSubscriptions.map(subscription => ({
            ...subscription,
            articles: filterArticles(subscription.articles)
        }));
    }) ?? [];

    // ... other logic
}