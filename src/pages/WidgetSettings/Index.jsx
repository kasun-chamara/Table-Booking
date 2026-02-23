

import React from "react";
import WidgetConfigurations from "../../components/CardComponents/ColorCard/index";
import SelectWidgetType from "../../components/CardComponents/WidgetTypeCopyCard/Index";
import WidgetConfigurationsType from "../../components/CardComponents/WidgetTypeCopyCard/SelectWidget";

export default function WidgetSettings({ darkMode, setDarkMode }) {
	return (
		<div>
			<h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, textAlign: 'left' }}>Widget Settings</h1>
			<div className="grid grid-cols-12 gap-4 mb-8">
				<div className="col-span-3">
					<WidgetConfigurationsType darkMode={darkMode} setDarkMode={setDarkMode} />
				</div>
				<div className="col-span-9">
					<WidgetConfigurations darkMode={darkMode} setDarkMode={setDarkMode} />
				</div>
			</div>
			<SelectWidgetType darkMode={darkMode} setDarkMode={setDarkMode} />
		</div>
	);
}
