import IconButton from './IconButton';
import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import StackPanel from './StackPanel';
import Menu from '../icons/menu.svg';

type BarChild = {
    id: string;
    sort: number;
    child: React.ReactNode;
};

type BarMap = {
    [id: string]: BarChild;
};

export const AppBarContext = React.createContext({
    add: (node: BarChild) => { },
    remove: (id: string) => { }
});

class ContextHelper {
    children: BarMap = {};
    setChildren: (children: BarMap) => void;

    constructor(setChildren: (children: BarMap) => void) {
        this.setChildren = setChildren;
    }

    add(node: BarChild) {
        this.children = {
            ...this.children,
            [node.id]: node
        };

        this.setChildren(this.children);
    }

    remove(id: string) {
        this.children = { ...this.children };
        delete this.children[id];
        this.setChildren(this.children);
    }
}

const appBarButtonVariants = {
    initial: {
        width: 0,
        opacity: 0
    },
    in: {
        width: 'auto',
        opacity: 1
    },
    out: {
        width: 0,
        opacity: 0
    }
}
export default function ProgrssiveAppBar(props: { children: React.ReactNode }) {
    const [, setBarChildren] = useState<BarMap>({});

    const [context] = useState(new ContextHelper(setBarChildren));

    return <AppBarContext.Provider value={context}>
        <div className="flex flex-row items-center text-foreground w-full h-12 shadow-sm lg:px-6 z-10 relative title-bar">
            <AppDrawer trigger={<IconButton><Menu /></IconButton>} />
            <a className='no-style' href='/stream/all'>
                <div className="text-lg font-normal">Velox Reader</div>
            </a>
            <StackPanel className="flex-1" direction="row" alignItems="center" justifyContent="end" spacing="space-x-2">
                {Object.values(context.children).sort((a, b) => b.sort - a.sort).map(child => <React.Fragment key={child.id}>
                    {child.child}
                </React.Fragment>)}
            </StackPanel>
        </div>
        {props.children}
    </AppBarContext.Provider>;
}
