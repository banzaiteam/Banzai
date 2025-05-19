import * as TabsRadix from '@radix-ui/react-tabs'
import s from './Tabs.module.scss';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

type TabItem = {
    value: string
    title: string
    disabled?: boolean
    content?: ReactNode
}

type Props = {
    tabs: TabItem[]
    defaultValue?: string
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ tabs, defaultValue, ...rest }: Props) => {
    return (
        <TabsRadix.Root className={s.root} defaultValue={defaultValue} {...rest}>
            <TabsRadix.List className={s.list}>
                {tabs.map((tab) => (
                    <TabsRadix.Trigger key={tab.value} className={s.trigger} value={tab.value} disabled={tab.disabled}>
                        {tab.title}
                    </TabsRadix.Trigger>
                ))}
            </TabsRadix.List>
            {tabs.map((tab) =>
                tab.content ? (
                    <TabsRadix.Content key={tab.value} className={s.content} value={tab.value}>
                        {tab.content}
                    </TabsRadix.Content>
                ) : null
            )}
        </TabsRadix.Root>
    );
}