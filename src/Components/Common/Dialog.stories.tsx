import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { QuestRexDialog } from './Dialog';

const meta: Meta<typeof QuestRexDialog> = {
  title: 'Common/QuestRexDialog',
  component: QuestRexDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestRexDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Example modal',
    children: <p>This is the default modal body. Use the close button or X to dismiss.</p>,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Closed modal',
    children: <p>This modal is closed and will not be visible.</p>,
  },
};

export const WithCustomFooter: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Custom footer',
    children: <p>This modal has custom footer content instead of the default Close button.</p>,
    footerContent: (
      <span style={{ marginLeft: 'auto' }}>
        <button type="button" className="char-sheet__button">Custom action</button>
      </span>
    ),
  },
};

export const LongContent: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Long content',
    children: (
      <div>
        <p>Paragraph one. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Paragraph two. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Paragraph three. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      </div>
    ),
  },
};

function ToggleStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="char-sheet__button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <QuestRexDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Toggleable modal"
      >
        <p>You can open and close this modal. The overlay and close button should work.</p>
      </QuestRexDialog>
    </>
  );
}

export const Toggleable: Story = {
  render: () => <ToggleStory />,
};
