import { getDashboardAnalytics } from "../repositories/dashboard.repository.js";

export const fetchDashboardAnalytics = async (userId) => {
  const links = await getDashboardAnalytics(userId);

  const allClicks = links.flatMap((link) => link.clicksData);

  const summary = {
    totalLinks: links.length,
    totalClicks: 0,
    uniqueClicks: 0,
    totalVisitors: 0,
    totalConversions: 0,
    conversionRate: 0,
    averageClicksPerLink: 0,
  };

  const countries = {};
  const devices = {};
  const referrers = {};
  const browsers = {};

  links.forEach((link) => {
    summary.totalClicks += link.clicks;
    summary.uniqueClicks += link.uniqueClicks;
    summary.totalVisitors += link.visitors;
    summary.totalConversions += link.conversions;
  });
  summary.conversionRate =
    summary.totalClicks > 0
      ? Number(
          ((summary.totalConversions / summary.totalClicks) * 100).toFixed(2),
        )
      : 0;
  summary.averageClicksPerLink =
    summary.totalLinks > 0
      ? Number((summary.totalClicks / summary.totalLinks).toFixed(2))
      : 0;

  allClicks.forEach((click) => {
    const country = click.country || "Unknown";
    countries[country] = (countries[country] || 0) + 1;

    const device = click.deviceType || "Unknown";
    devices[device] = (devices[device] || 0) + 1;

    const referrer = click.referrer || "Direct";
    referrers[referrer] = (referrers[referrer] || 0) + 1;
    const browser = click.browser || "Unknown";
    browsers[browser] = (browsers[browser] || 0) + 1;
  });

  return {
    summary,

    chart: allClicks,

    countries: Object.entries(countries).map(([name, clicks]) => ({
      name,
      clicks,
    })),

    devices: Object.entries(devices).map(([name, clicks]) => ({
      name,
      clicks,
    })),

    referrers: Object.entries(referrers).map(([name, clicks]) => ({
      name,
      clicks,
    })),
    browsers: Object.entries(browsers).map(([name, clicks]) => ({
      name,
      clicks,
    })),

    topLinks: links
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
      .map((link) => ({
        id: link.id,
        title: link.title,
        shortCode: link.shortCode,
        clicks: link.clicks,
        uniqueClicks: link.uniqueClicks,
        visitors: link.visitors,
        conversions: link.conversions,
      })),
  };
};
