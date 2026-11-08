import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LandingPageView } from '../views/LandingPageView';
import { HamburgerMenuModal } from '../components/HamburgerMenuModal';
import { PWAProvider } from '../context/PWAContext';
import { ThemeProvider } from '../context/ThemeContext';
import { UpdateProvider } from '../context/UpdateContext';
import '../i18n';
import i18n from '../i18n';

const renderLanding = (props: { onLaunchApp: () => void }) => {
  return render(
    <ThemeProvider>
      <PWAProvider>
        <LandingPageView {...props} />
      </PWAProvider>
    </ThemeProvider>
  );
};

describe('Landing Page & Public Showcase Unit Tests', () => {
  it('renders landing page with headline, subtitle and primary CTAs', () => {
    const handleLaunchApp = vi.fn();
    renderLanding({ onLaunchApp: handleLaunchApp });

    // Verify main H1 title exists
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toMatch(/Maîtrisez les réseaux|Master Networks/i);

    // Verify CTA button triggers launch
    const ctaButtons = screen.getAllByText(/Découvrir la plateforme|Discover the Platform/i);
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(ctaButtons[0]);
    expect(handleLaunchApp).toHaveBeenCalledTimes(1);
  });

  it('renders all 11 core architectural and pedagogical sections', () => {
    const { container } = renderLanding({ onLaunchApp: vi.fn() });

    // Verify key landmark sections
    expect(container.querySelector('#hero')).not.toBeNull();
    expect(container.querySelector('#about')).not.toBeNull();
    expect(container.querySelector('#features')).not.toBeNull();
    expect(container.querySelector('#learning')).not.toBeNull();
    expect(container.querySelector('#technologies')).not.toBeNull();
    expect(container.querySelector('#bilingual')).not.toBeNull();
    expect(container.querySelector('#devices')).not.toBeNull();
    expect(container.querySelector('#audiences')).not.toBeNull();

    // Verify footer
    const footer = container.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).toContain('NetOps Academy');
  });

  it('contains valid and secure link to the GitHub repository', () => {
    renderLanding({ onLaunchApp: vi.fn() });

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);

    const mainGithubLink = githubLinks.find(
      (link) => link.getAttribute('href') === 'https://github.com/sheriffhomard/Netops'
    );
    expect(mainGithubLink).toBeDefined();
    expect(mainGithubLink?.getAttribute('target')).toBe('_blank');
    expect(mainGithubLink?.getAttribute('rel')).toContain('noopener');
  });

  it('allows interactive sandbox tab switching between Terminal, Flashcards, and Subnet Calculator', () => {
    renderLanding({ onLaunchApp: vi.fn() });

    // Find sandbox tab buttons
    const terminalTab = screen.getByText('Terminal IOS-XE');
    const flashcardsTab = screen.getByText('Fiches SRS 3D');
    const subnetTab = screen.getByText('Calculateur CIDR');

    expect(terminalTab).toBeDefined();
    expect(flashcardsTab).toBeDefined();
    expect(subnetTab).toBeDefined();

    // Switch to flashcards
    fireEvent.click(flashcardsTab);
    expect(screen.getAllByText(/Algorithme SRS Leitner/i).length).toBeGreaterThanOrEqual(1);

    // Switch to CIDR calculator
    fireEvent.click(subnetTab);
    expect(screen.getByText(/Calculateur CIDR \/ VLSM Instantané/i)).toBeDefined();
  });

  it('dynamically translates landing page when language changes', async () => {
    renderLanding({ onLaunchApp: vi.fn() });

    // Switch to English
    await React.act(async () => {
      await i18n.changeLanguage('en');
    });
    const enHeading = screen.getByRole('heading', { level: 1 });
    expect(enHeading.textContent).toContain('Master Networks');

    // Switch back to French
    await React.act(async () => {
      await i18n.changeLanguage('fr');
    });
    const frHeading = screen.getByRole('heading', { level: 1 });
    expect(frHeading.textContent).toContain('Maîtrisez les réseaux');
  });

  it('provides direct access to landing page from HamburgerMenuModal', () => {
    const handleNavigateToLanding = vi.fn();
    const handleClose = vi.fn();

    render(
      <ThemeProvider>
        <UpdateProvider>
          <PWAProvider>
            <HamburgerMenuModal
              isOpen={true}
              onClose={handleClose}
              currentView="tableau-de-bord"
              onSelectView={vi.fn()}
              onOpenSubnetCalc={vi.fn()}
              onOpenSystemSettings={vi.fn()}
              onOpenLegalDisclaimer={vi.fn()}
              onNavigateToLanding={handleNavigateToLanding}
            />
          </PWAProvider>
        </UpdateProvider>
      </ThemeProvider>
    );

    // Verify presence of landing page / showcase buttons in Hamburger menu
    const showcaseButtons = screen.getAllByRole('button', { name: /Vitrine|Showcase/i });
    expect(showcaseButtons.length).toBeGreaterThanOrEqual(1);

    // Clicking it triggers handleNavigateToLanding and closes modal
    fireEvent.click(showcaseButtons[0]);
    expect(handleNavigateToLanding).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
