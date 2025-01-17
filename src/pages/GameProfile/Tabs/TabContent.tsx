interface Props {
  children?: React.ReactNode;
  index: number;
  tab: number;
}

function TabContent({ children, tab, index }: Props) {
  return (
    <div
      style={{ width: '100%', borderTop: '1px solid #e0e0e0' }}
      role="tabpanel"
      hidden={tab !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {tab === index && <div>{children}</div>}
    </div>
  );
}

export default TabContent;
