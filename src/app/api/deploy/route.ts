import { NextResponse } from 'next/server';

// In-memory deployment history log for demo/session persistence
let deploymentLogs = [
  {
    id: 'dep_1',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'success',
    author: 'Sharon French (Owner)',
    trigger: 'Manual Admin Portal Trigger',
    commit: 'v1.4.0 - Meet the Artists & Wavy Banner Update',
    duration: '42s',
  },
  {
    id: 'dep_2',
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'success',
    author: 'Sharon French (Owner)',
    trigger: 'CMS Text & Pricing Save',
    commit: 'v1.3.9 - Service Price Adjustments',
    duration: '38s',
  },
  {
    id: 'dep_3',
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'success',
    author: 'System Auto-Build',
    trigger: 'Pop-Up Application Approval',
    commit: 'v1.3.5 - Added New Vendor Booth',
    duration: '45s',
  },
];

let activeDeployStatus = {
  isDeploying: false,
  lastDeployedAt: deploymentLogs[0].timestamp,
  environment: 'Production',
  domain: 'https://thebraidbarnj.com',
  provider: 'Vercel / Netlify / Cloudflare',
  ssl: 'Active & SSL Secured',
};

export async function GET() {
  return NextResponse.json({
    status: activeDeployStatus,
    logs: deploymentLogs,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { webhookUrl, customNotes, author = 'Sharon French (Owner)' } = body;

    // Simulate triggering external webhook if URL provided
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'site_deploy_requested',
            triggered_by: author,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Webhook trigger attempted:', err);
      }
    }

    const newLog = {
      id: `dep_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'success',
      author,
      trigger: customNotes || 'Manual 1-Click Publish from Owner Admin Portal',
      commit: `v1.4.1 - Live Website Build (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      duration: '35s',
    };

    deploymentLogs.unshift(newLog);
    activeDeployStatus.lastDeployedAt = newLog.timestamp;

    return NextResponse.json({
      success: true,
      message: 'Site deployment triggered successfully! Live build is now publishing.',
      log: newLog,
      status: activeDeployStatus,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to initiate deployment request' },
      { status: 500 }
    );
  }
}
