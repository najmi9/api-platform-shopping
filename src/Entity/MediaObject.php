<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateMediaObjectAction;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 *   "security"="is_granted('ROLE_ADMIN')",
 *             "security_message"="vous avez pas le droit de créer cet image",
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={
 *         "groups"={"media_object_read"}
 *     }, 
 *     collectionOperations={
 *         "post"={
 *             "controller"=CreateMediaObjectAction::class,
 *             "deserialize"=false,
 *           
 *             "validation_groups"={"Default", "media_object_create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "file"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         },
 *         "get"={}
 *     },
 *     itemOperations={
 *         "get"={},
 *         "delete"={},
 *     }
 * )
 * @Vich\Uploadable
 */
class MediaObject
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     */
    protected $id;

    /**
     * @ORM\Column(nullable=true)
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"media_object_read", "product:read",  "order:read", "products:read", "all-cart:read", "media_object_create"})
     */
    private $contentUrl;

    /**
     * @Assert\NotNull(groups={"media_object_create"})
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath")
     */
    public $file;

    /**
     * @ORM\Column(nullable=true)
     * @Groups({"media_object_read", "product:read",  "order:read", "products:read", "all-cart:read", "media_object_create"})
     */
    public $filePath;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="picture")
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setContentUrl($contentUrl){
        $this->contentUrl = $contentUrl;
        return $this;
    }

    public function getContentUrl(): ?string
    {
          return  $this->contentUrl;
      
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setPicture($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            // set the owning side to null (unless already changed)
            if ($product->getPicture() === $this) {
                $product->setPicture(null);
            }
        }

        return $this;
    }

}