import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LandingPageView } from '../views/LandingPageView';
import { PWAProvider } from '../context/PWAContext';
import { ThemeProvider } from '../context/ThemeContext';
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
    expect(heading).toBeInTheDocument();
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
    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#features')).toBeInTheDocument();
    expect(container.querySelector('#learning')).toBeInTheDocument();
    expect(container.querySelector('#technologies')).toBeInTheDocument();
    expect(container.querySelector('#bilingual')).toBeInTheDocument();
    expect(container.querySelector('#devices')).toBeInTheDocument();
    expect(container.querySelector('#audiences')).toBeInTheDocument();

    // Verify footer
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
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

    expect(terminalTab).toBeInTheDocument();
    expect(flashcardsTab).toBeInTheDocument();
    expect(subnetTab).toBeInTheDocument();

    // Switch to flashcards
    fireEvent.click(flashcardsTab);
    expect(screen.getAllByText(/Algorithme SRS Leitner/i).length).toBeGreaterThanOrEqual(1);

    // Switch to CIDR calculator
    fireEvent.click(subnetTab);
    expect(screen.getByText(/Calculateur CIDR \/ VLSM Instantané/i)).toBeInTheDocument();
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
});
