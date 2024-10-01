'use client';
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";

function ClientDashboard() {
    return (
        <EmailPasswordAuth>
            <div>Client Dashboard</div>
        </EmailPasswordAuth>
    );
}

