import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Divider, Avatar, Link, Chip } from "@nextui-org/react";
import { useShallow } from "zustand/react/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import modules from "./modules";
import useLayoutStore from "@/states/layout";
import useMetadataStore from "@/states/metadata";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { me, systemSettings } = useMetadataStore(useShallow((state) => ({ me: state.me, systemSettings: state.systemSettings })));
  const currentModule = useLayoutStore(useShallow((state) => state.module));

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} disableAnimation isBordered>
      <NavbarContent justify="start" className="py-4">
        <NavbarItem>
          <NavbarBrand className="flex gap-2 font-semibold">
            <FontAwesomeIcon icon={currentModule.icon} fontSize={13} />
            {currentModule.label}
          </NavbarBrand>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem>{currentModule.control}</NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarMenu>
        <div className="flex gap-2 w-full justify-end rounded items-center">
          <Chip className="shadow-sm">URL: {systemSettings?.contextPath}</Chip>
          <Chip className="shadow-sm">User: {me?.name}</Chip>
          <Chip className="shadow-sm">version: {systemSettings?.version}</Chip>
        </div>
        <p className="text-end text-black/50 font-semibold mt-2 -mb-1">Modules</p>
        {modules.map((module, index) => (
          <NavbarMenuItem
            isActive={module.key === currentModule.key}
            className="flex items-center justify-end gap-2 cursor-pointer"
            key={`${module.key}-${index}`}
          >
            <FontAwesomeIcon icon={module.icon} fontSize={12} />
            {module.label}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
