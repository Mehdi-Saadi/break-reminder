import { describe, it, expect } from 'vitest';
import icon from '@/shared/ui/icons';

describe('icon function', () => {
  it("should return the correct SVG for the 'add' icon", () => {
    const result = icon('add');
    expect(result).toBe('<svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>');
  });

  it('should add custom classes to the SVG', () => {
    const result = icon('add', 'custom-class');
    expect(result).toContain('class="custom-class"');
  });

  it('should not modify the original icons object', () => {
    const originalAddIcon = icon('add');
    icon('add', 'new-class');
    expect(icon('add')).toBe(originalAddIcon);
  });
});
