-- CreateIndex
CREATE INDEX "Click_linkId_visitorId_ipAddress_browser_browserVersion_ope_idx" ON "Click"("linkId", "visitorId", "ipAddress", "browser", "browserVersion", "operatingSystem", "deviceType");
